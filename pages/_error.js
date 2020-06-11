import Layout from '../theming/layouts/isUsers';
function Error({ statusCode }) {
  return (
    <Layout title="Dashboard">
      {statusCode
        ? 'An error ' + statusCode + ' occurred on server'
        : 'An error occurred on client'}
    </Layout>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;