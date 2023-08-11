## Setup

Make sure you have nodejs installed (>= v.16):

```bash
node -v
```

Setup the project specifications you want:

### Basic
```bash
yarn setup <domain-name> <has-ens-bridge> <ens-tld> <issuance-id> <press> <zone-contract> <base-price> <color-scheme> <db-url> <db-admin> <db-collection> <db-password> <rpc-url>
```

If you want to use the standard BProto color scheme just put "".


## Development Server

Start the development server on http://localhost:3000

```bash
yarn dev
```

## Production

Build the application for production:

```bash
yarn run build
```

Locally preview production build:

```bash
yarn run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
