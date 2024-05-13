import * as React from 'react';
import { LinkNode } from '~/models/index.types';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface LinkCollectionProps {
	onClickHandler?: () => void;
	node: LinkNode;
}

export const LinkCollection: React.FC<LinkCollectionProps> = (props: LinkCollectionProps) => {
	const { node, onClickHandler } = props;
	return (
		<article
			className="linkCollection"
			onClick={(e) => {
				e.preventDefault();
				onClickHandler?.();
			}}
		>
			<div className={'previewContent'}>
				<h3 className={'collectionTitle'}>{node.title}</h3>
				<p className="description">{node.description}</p>
				<div className="textPreview">
					<Markdown remarkPlugins={[remarkGfm]}>{node.content.split('\n').slice(0, 4).join('\n')}</Markdown>
				</div>
			</div>
		</article>
	);
};
