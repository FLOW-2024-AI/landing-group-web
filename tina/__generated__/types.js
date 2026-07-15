export function gql(strings, ...args) {
  let str = "";
  strings.forEach((string, i) => {
    str += string + (args[i] || "");
  });
  return str;
}
export const SitePartsFragmentDoc = gql`
    fragment SiteParts on Site {
  __typename
  brand {
    __typename
    name
    group
    legal
    tagline
  }
  nav {
    __typename
    links {
      __typename
      label
      href
    }
    cta {
      __typename
      label
      href
    }
  }
  hero {
    __typename
    title
    accents
    script
    sub
    ctaPrimary {
      __typename
      label
      href
    }
    ctaSecondary {
      __typename
      label
      href
    }
    tiles {
      __typename
      label
      note
    }
  }
  marquee
  works {
    __typename
    label
    title
    intro
    items {
      __typename
      src
      brand
      piece
      desc
    }
  }
  services {
    __typename
    label
    title
    items {
      __typename
      n
      slug
      name
      body
      photo
      detail {
        __typename
        claim
        intro
        bullets
        gallery {
          __typename
          src
          alt
        }
      }
    }
  }
  stats {
    __typename
    label
    title
    items {
      __typename
      value
      label
    }
  }
  statement {
    __typename
    small
    big
    accents
  }
  process {
    __typename
    label
    title
    steps {
      __typename
      n
      title
      body
    }
  }
  cta {
    __typename
    title
    body
    button {
      __typename
      label
      href
    }
  }
  agenda {
    __typename
    label
    title
    script
    intro
    slots
    email
    disclaimer
  }
  footer {
    __typename
    columns {
      __typename
      title
      links {
        __typename
        label
        href
      }
    }
    note
  }
}
    `;
export const SiteDocument = gql`
    query site($relativePath: String!) {
  site(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...SiteParts
  }
}
    ${SitePartsFragmentDoc}`;
export const SiteConnectionDocument = gql`
    query siteConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: SiteFilter) {
  siteConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...SiteParts
      }
    }
  }
}
    ${SitePartsFragmentDoc}`;
export function getSdk(requester) {
  return {
    site(variables, options) {
      return requester(SiteDocument, variables, options);
    },
    siteConnection(variables, options) {
      return requester(SiteConnectionDocument, variables, options);
    }
  };
}
import { createClient } from "tinacms/dist/client";
const generateRequester = (client) => {
  const requester = async (doc, vars, options) => {
    let url = client.apiUrl;
    if (options?.branch) {
      const index = client.apiUrl.lastIndexOf("/");
      url = client.apiUrl.substring(0, index + 1) + options.branch;
    }
    const data = await client.request({
      query: doc,
      variables: vars,
      url
    }, options);
    return { data: data?.data, errors: data?.errors, query: doc, variables: vars || {} };
  };
  return requester;
};
export const ExperimentalGetTinaClient = () => getSdk(
  generateRequester(
    createClient({
      url: "http://localhost:4001/graphql",
      queries
    })
  )
);
export const queries = (client) => {
  const requester = generateRequester(client);
  return getSdk(requester);
};
