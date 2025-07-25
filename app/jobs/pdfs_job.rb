# frozen_string_literal: true

class PdfsJob
  include Sidekiq::Job

  def perform(user_id, post_slug)
    Rails.logger.info "PdfsJob: Broadcasting 25% progress for user #{user_id}"
    ActionCable.server.broadcast(user_id, { message: I18n.t("pdf.render"), progress: 25 })

    post = Post.find_by!(slug: post_slug)

    content = ApplicationController.render(
      assigns: {
        post:
      },
      template: "posts/pdf/download",
      layout: "pdf"
    )

    Rails.logger.info "PdfsJob: Broadcasting 50% progress for user #{user_id}"
    ActionCable.server.broadcast(user_id, { message: I18n.t("pdf.generate"), progress: 50 })

    pdf_report = WickedPdf.new.pdf_from_string(content)

    Rails.logger.info "PdfsJob: Broadcasting 75% progress for user #{user_id}"
    ActionCable.server.broadcast(user_id, { message: I18n.t("pdf.upload"), progress: 75 })

    if post.pdf.attached?
      post.pdf.purge_later
    end

    post.pdf.attach(
      io: StringIO.new(pdf_report), filename: "#{post_slug}-blog.pdf",
      content_type: "application/pdf")

    post.save!

    Rails.logger.info "PdfsJob: Broadcasting 100% progress for user #{user_id}"
    ActionCable.server.broadcast(user_id, { message: I18n.t("pdf.attach"), progress: 100 })
  end
end
