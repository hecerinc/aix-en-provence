import { Links, Meta, Outlet, Scripts } from '@remix-run/react';
import { type LinksFunction } from '@remix-run/node';

import appStylesHref from './root.css?url';

export const links: LinksFunction = () => {
	return [
		{ rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css' },
		{ rel: 'stylesheet', href: appStylesHref },
	];
};

export function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta />
				<Links />
			</head>
			<body>
				<main className="container">{children}</main>
				<Scripts />
			</body>
		</html>
	);
}

export default function App() {
	return <Outlet />;
}
