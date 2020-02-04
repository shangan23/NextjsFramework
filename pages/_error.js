import User from '../theming/layouts/user';
function Error({ statusCode }) {
  return (
    <User title="Dashboard">
      {statusCode
        ? 'An error ' + statusCode + ' occurred on server'
        : 'An error occurred on client'}
    </User>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;