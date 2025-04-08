'use client';

import { useEffect } from 'react';
import { useEditable } from 'use-editable';

type Props = {
	editorRef: React.RefObject<HTMLDivElement | null>;
	placeholder: string;
	content: string;
	onContentChange(value: string): void;
};

export default function Editable({ editorRef, placeholder, content, onContentChange }: Props) {
	useEditable(editorRef, onContentChange);

	const handleFocus = () => {
		// Remove placeholder class when focused
		if (editorRef.current && editorRef.current.textContent === '') {
			editorRef.current.classList.remove('placeholder');
		}
	};

	const handleBlur = () => {
		// Add placeholder class when blurred and empty
		if (editorRef.current && editorRef.current.textContent === '') {
			editorRef.current.classList.add('placeholder');
		} else {
			console.log(':', editorRef.current?.textContent, ':');
		}
	};

	useEffect(() => {
		// Initialize with placeholder class if empty
		if (editorRef.current && editorRef.current.textContent === '') {
			editorRef.current.classList.add('placeholder');
		}
	}, [editorRef]);

	return (
		<div
			contentEditable
			suppressContentEditableWarning
			ref={editorRef}
			className="editable-div min-h-[2rem]"
			onFocus={handleFocus}
			onBlur={handleBlur}
			data-placeholder={placeholder}>
			{content}
		</div>
	);
}
