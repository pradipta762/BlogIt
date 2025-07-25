# frozen_string_literal: true

class Post < ApplicationRecord
  enum :status, { published: "published", draft: "draft" }, default: :published

  belongs_to :user
  belongs_to :organization
  has_and_belongs_to_many :categories
  has_many :votes, dependent: :destroy
  has_one_attached :pdf

  validates :title, presence: true, length: { maximum: Constants::MAX_TITLE_LENGTH }
  validates :description, presence: true, length: { maximum: Constants::MAX_DESCRIPTION_LENGTH }
  validates_inclusion_of :is_bloggable, in: [true, false]

  validates :slug, uniqueness: true
  validate :slug_not_changed

  before_create :set_slug

  def net_votes
    votes.upvote.count - votes.downvote.count
  end

  def update_bloggable_status!
    update!(is_bloggable: net_votes >= Constants::VOTE_THRESHOLD)
  end

  private

    def set_slug
      title_slug = title.parameterize
      regex_pattern = "slug #{Constants::DB_REGEX_OPERATOR} ?"
      latest_post_slug = Post.where(
        regex_pattern,
        "^#{title_slug}$|^#{title_slug}-[0-9]+$",
      ).order("LENGTH(slug) DESC", slug: :desc).first&.slug
      slug_count = 0
      if latest_post_slug.present?
        slug_count = latest_post_slug.split("-").last.to_i
        only_one_slug_exists = slug_count == 0
        slug_count = 1 if only_one_slug_exists
      end
      slug_candidate = slug_count.positive? ? "#{title_slug}-#{slug_count + 1}" : title_slug
      self.slug = slug_candidate
    end

    def slug_not_changed
      if will_save_change_to_slug? && self.persisted?
        errors.add(:slug, I18n.t("post.slug.immutable"))
      end
    end
end
