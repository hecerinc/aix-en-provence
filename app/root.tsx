import { Links, Meta, Outlet, Scripts } from '@remix-run/react';
import { type LinksFunction } from '@remix-run/node';

import { json, ActionFunctionArgs } from '@remix-run/node';
import { type LinkNodeMutation, createLinkCollection } from './data';

import appStylesHref from './root.css?url';

export const links: LinksFunction = () => {
	return [
		{ rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css' },
		{ rel: 'stylesheet', href: appStylesHref },
	];
};

export const action = async ({ params, request }: ActionFunctionArgs) => {
	const formData = await request.formData();
	const data = Object.fromEntries(formData) as unknown as LinkNodeMutation;
	const collection = await createLinkCollection(data);
	return json({ collection, success: true });
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
