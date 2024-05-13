import * as React from 'react';
import type { MetaFunction } from '@remix-run/node';
import { json, ActionFunctionArgs } from '@remix-run/node';

import type { LinkNodeMutation } from '../data';
import { createLinkCollection, getLinkCollections } from '../data';
import { LinkNode } from '~/models/index.types';

import { CollectionGrid } from '~/views/CollectionGrid/CollectionGrid';
import { useLoaderData } from '@remix-run/react';

export const meta: MetaFunction = () => {
	return [{ title: 'Aix link manager' }, { name: 'description', content: 'Aix is a tiny link manager' }];
};

export const StoreContext = React.createContext({ isNew: false, setIsNew: (_v: boolean) => {} });

export const action = async ({ params, request }: ActionFunctionArgs) => {
	const formData = await request.formData();
	const data = Object.fromEntries(formData) as unknown as LinkNodeMutation;
	const collection = await createLinkCollection(data);
	return json({ collection });
};

export const loader = async () => {
	const linkCollections = await getLinkCollections();
	return json({ linkCollections });
};

export default function Index() {
	const [isDialogOpen, setIsDialogOpen] = React.useState<boolean>(false);
	const [isNew, setIsNew] = React.useState<boolean>(false);
	const { linkCollections } = useLoaderData<typeof loader>();
	const collections: LinkNode[] = linkCollections.map((t) => {
		const newt: LinkNode = { ...t, lastUpdated: new Date(), created: new Date() };
		newt.lastUpdated = new Date(t.lastUpdated);
		newt.created = new Date(t.created);
		return newt;
	});

	return (
		<div>
			<header className="main-header space-between">
				<h1>Link manager</h1>
				<button
					onClick={() => {
						setIsNew(true);
						setIsDialogOpen(true);
					}}
					type="button"
				>
					+ Add new
				</button>
			</header>
			<StoreContext.Provider value={{ isNew, setIsNew }}>
				<CollectionGrid
					linkCollections={collections}
					isDialogOpen={isDialogOpen}
					setIsDialogOpen={setIsDialogOpen}
				/>
			</StoreContext.Provider>
		</div>
	);
}
