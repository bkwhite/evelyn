'use client';

import { useEffect, useRef, useState } from 'react';

type Props = {
	editorRef: React.RefObject<HTMLPreElement | null>;
	placeholder: string;
	content: string;
	onContentChange(value: string): void;
};

export default function Editable({ editorRef, placeholder, content, onContentChange }: Props) {
	const localContent = useRef(content);
	const [isInitialized, setIsInitialized] = useState(false);

	const setContent = (target: HTMLPreElement) => {
		const newContent = target.textContent || '';

		if (newContent !== localContent.current) {
			localContent.current = newContent;
			onContentChange(newContent);
		}
	};

	const handleInput = (event: React.FormEvent<HTMLPreElement>) => {
		setContent(event.target as HTMLPreElement);
	};

	const handleBlur = () => {
		if (editorRef.current) {
			const isEmpty =
				editorRef.current.innerHTML === '' ||
				editorRef.current.innerHTML === '<br>' ||
				editorRef.current.textContent === '';

			if (isEmpty) {
				editorRef.current.classList.add('placeholder');

				if (editorRef.current.innerHTML === '<br>') {
					editorRef.current.innerHTML = '';
				}
			}
		}
	};

	const handlePaste = (event: React.ClipboardEvent) => {
		event.preventDefault();

		const text = event.clipboardData.getData('text/plain');
		const selection = window.getSelection();

		if (!selection || !selection.rangeCount) return;

		const range = selection.getRangeAt(0);
		const textNode = document.createTextNode(text);

		range.deleteContents();
		range.insertNode(textNode);
		range.setStartAfter(textNode);
		range.setEndAfter(textNode);
		selection.removeAllRanges();
		selection.addRange(range);

		setContent(event.target as HTMLPreElement);
	};

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();

		if (editorRef.current) {
			editorRef.current.innerHTML = '';
			editorRef.current.classList.add('placeholder');
			localContent.current = '';
			onContentChange('');
		}
	};

	useEffect(() => {
		if (!editorRef.current) return;

		if (!isInitialized) {
			editorRef.current.textContent = content;
			localContent.current = content;
			setIsInitialized(true);

			if (content === '') {
				editorRef.current.classList.add('placeholder');
			}
		}
	}, [editorRef, content, isInitialized]);

	return (
		<pre
			className="editable-div min-h-[4rem]"
			contentEditable
			suppressContentEditableWarning
			ref={editorRef}
			onInput={handleInput}
			onBlur={handleBlur}
			onPaste={handlePaste}
			onSubmit={handleSubmit}
			data-placeholder={placeholder}
		/>
	);
}
