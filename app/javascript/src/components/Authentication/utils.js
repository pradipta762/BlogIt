export const makeOrganizationsOptions = organizations =>
  organizations?.map(organization => ({
    label: organization.name,
    value: organization.id,
  })) || [];
