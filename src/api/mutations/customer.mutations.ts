/**
 * ─── Customer GraphQL Mutations ───────────────────────────────────────────────
 *
 * All Shopify Storefront customer auth mutations.
 * Import these into customer.service.ts only — never in UI components.
 * ─────────────────────────────────────────────────────────────────────────────
 */

// ─── CUSTOMER_ACCESS_TOKEN_CREATE ─────────────────────────────────────────────
/** Login — exchange email + password for an access token */
export const CUSTOMER_ACCESS_TOKEN_CREATE = `
  mutation CustomerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
    customerAccessTokenCreate(input: $input) {
      customerAccessToken {
        accessToken
        expiresAt
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;

// ─── CUSTOMER_ACCESS_TOKEN_DELETE ─────────────────────────────────────────────
/** Logout — invalidate the customer access token */
export const CUSTOMER_ACCESS_TOKEN_DELETE = `
  mutation CustomerAccessTokenDelete($customerAccessToken: String!) {
    customerAccessTokenDelete(customerAccessToken: $customerAccessToken) {
      deletedAccessToken
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;

// ─── CUSTOMER_ACCESS_TOKEN_RENEW ──────────────────────────────────────────────
/** Renew a customer access token before it expires */
export const CUSTOMER_ACCESS_TOKEN_RENEW = `
  mutation CustomerAccessTokenRenew($customerAccessToken: String!) {
    customerAccessTokenRenew(customerAccessToken: $customerAccessToken) {
      customerAccessToken {
        accessToken
        expiresAt
      }
      userErrors {
        field
        message
      }
    }
  }
`;

// ─── CUSTOMER_CREATE ──────────────────────────────────────────────────────────
/** Register a new customer account */
export const CUSTOMER_CREATE = `
  mutation CustomerCreate($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      customer {
        id
        firstName
        lastName
        email
        phone
        acceptsMarketing
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;

// ─── CUSTOMER_UPDATE ──────────────────────────────────────────────────────────
/** Update customer profile fields */
export const CUSTOMER_UPDATE = `
  mutation CustomerUpdate(
    $customerAccessToken: String!
    $customer: CustomerUpdateInput!
  ) {
    customerUpdate(
      customerAccessToken: $customerAccessToken
      customer: $customer
    ) {
      customer {
        id
        firstName
        lastName
        email
        phone
        acceptsMarketing
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;

// ─── CUSTOMER_RECOVER ─────────────────────────────────────────────────────────
/** Trigger a password reset email */
export const CUSTOMER_RECOVER = `
  mutation CustomerRecover($email: String!) {
    customerRecover(email: $email) {
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;

// ─── CUSTOMER_RESET_BY_URL ────────────────────────────────────────────────────
/** Reset password using the URL from the reset email */
export const CUSTOMER_RESET_BY_URL = `
  mutation CustomerResetByUrl($resetUrl: URL!, $password: String!) {
    customerResetByUrl(resetUrl: $resetUrl, password: $password) {
      customer {
        id
        email
      }
      customerAccessToken {
        accessToken
        expiresAt
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;
