'use client';

import { useEffect, useRef, useState } from 'react';

type Props = {
	editorRef: React.RefObject<HTMLDivElement | null>;
	placeholder: string;
	content: string;
	onContentChange(value: string): void;
};

export default function Editable({ editorRef, placeholder, content, onContentChange }: Props) {
	const [isInitialized, setIsInitialized] = useState(false);
	const localContent = useRef(content);

	// Handle placeholder class
	const handleFocus = () => {
		if (editorRef.current && editorRef.current.textContent === '') {
			editorRef.current.classList.remove('placeholder');
		}
	};

	const handleBlur = () => {
		if (editorRef.current) {
			// Check if div is actually empty (handles the <br> case)
			const isEmpty =
				editorRef.current.innerHTML === '' ||
				editorRef.current.innerHTML === '<br>' ||
				editorRef.current.textContent === '';

			if (isEmpty) {
				editorRef.current.classList.add('placeholder');
				// Clear the <br> if present
				if (editorRef.current.innerHTML === '<br>') {
					editorRef.current.innerHTML = '';
				}
			}
		}
	};

	// Handle input changes
	const handleInput = (event: React.FormEvent<HTMLDivElement>) => {
		const target = event.target as HTMLDivElement;
		const newContent = target.textContent || '';

		// Only update if content has changed
		if (newContent !== localContent.current) {
			localContent.current = newContent;
			onContentChange(newContent);
		}
	};

	// Handle paste to strip formatting
	const handlePaste = (event: React.ClipboardEvent) => {
		event.preventDefault();

		// Get plain text from clipboard
		const text = event.clipboardData.getData('text/plain');

		// Insert at cursor position
		document.execCommand('insertText', false, text);
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

	// Initialize component
	useEffect(() => {
		if (!editorRef.current) return;

		// Set initial content
		if (!isInitialized) {
			editorRef.current.textContent = content;
			localContent.current = content;
			setIsInitialized(true);

			// Add placeholder if needed
			if (content === '') {
				editorRef.current.classList.add('placeholder');
			}
		}
	}, [editorRef, content, isInitialized]);

	return (
		<div
			className="editable-div min-h-[2rem]"
			contentEditable
			suppressContentEditableWarning
			ref={editorRef}
			onInput={handleInput}
			onFocus={handleFocus}
			onBlur={handleBlur}
			onPaste={handlePaste}
			onSubmit={handleSubmit}
			data-placeholder={placeholder}
		/>
	);
}
