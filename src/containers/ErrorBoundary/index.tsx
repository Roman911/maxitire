import { useRouteError } from 'react-router-dom';

export const ErrorBoundary = () => {
	const error = useRouteError();

	console.log(error)

	return <div>Something went wrong</div>;
}
