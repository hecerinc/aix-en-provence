import * as React from 'react';

import { LinkCollection } from '~/components/LinkCollection/LinkCollection';
import { LinkDialog } from '~/components/LinkDialog/LinkDialog';
import type { LinkNode } from '~/models/index.types';
// const = {};

import { fakeData } from '~/data';

interface CollectionGridProps {
	isDialogOpen: boolean;
	setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CollectionGrid: React.FC<CollectionGridProps> = (props: CollectionGridProps) => {
	const [selectedNode, setSelectedNode] = React.useState<LinkNode | null>(null);
	const { isDialogOpen, setIsDialogOpen } = props;

	const onArticleClick = (node: LinkNode) => {
		setSelectedNode(node);
		setIsDialogOpen(true);
	};

	const closeModal: React.ReactEventHandler = (_e: React.SyntheticEvent) => {
		setIsDialogOpen(false);
		setSelectedNode(null);
		// navigate("/");
	};

	return (
		<>
			<section className={'collectionGrid'}>
				{fakeData.map((t: LinkNode) => (
					<div key={t.id} className="gridItem">
						<LinkCollection
							node={t}
							onClickHandler={() => {
								onArticleClick(t);
							}}
						/>
					</div>
				))}
			</section>
			<LinkDialog
				isOpen={isDialogOpen}
				selectedNode={selectedNode}
				onDialogClose={closeModal}
				onSaveHandler={(node) => {}}
			/>
		</>
	);
};
