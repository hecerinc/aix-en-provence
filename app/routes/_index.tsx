import * as React from 'react';
import type { MetaFunction } from '@remix-run/node';

import { CollectionGrid } from '~/views/CollectionGrid/CollectionGrid';

export const meta: MetaFunction = () => {
	return [{ title: 'Aix link manager' }, { name: 'description', content: 'Aix is a tiny link manager' }];
};

export const StoreContext = React.createContext({ isNew: false, setIsNew: (_v: boolean) => {} });

export default function Index() {
	const [isDialogOpen, setIsDialogOpen] = React.useState<boolean>(false);
	const [isNew, setIsNew] = React.useState<boolean>(false);
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
				<CollectionGrid isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen} />
			</StoreContext.Provider>
		</div>
	);
}
