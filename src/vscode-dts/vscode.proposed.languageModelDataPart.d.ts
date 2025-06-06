/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

// version: 1

declare module 'vscode' {

	export interface LanguageModelChat {
		sendRequest(messages: Array<LanguageModelChatMessage | LanguageModelChatMessage2>, options?: LanguageModelChatRequestOptions, token?: CancellationToken): Thenable<LanguageModelChatResponse>;
		countTokens(text: string | LanguageModelChatMessage | LanguageModelChatMessage2, token?: CancellationToken): Thenable<number>;
	}

	/**
	 * Represents a message in a chat. Can assume different roles, like user or assistant.
	 */
	export class LanguageModelChatMessage2 {

		/**
		 * Utility to create a new user message.
		 *
		 * @param content The content of the message.
		 * @param name The optional name of a user for the message.
		 */
		static User(content: string | Array<LanguageModelTextPart | LanguageModelToolResultPart | LanguageModelDataPart | LanguageModelExtraDataPart>, name?: string): LanguageModelChatMessage2;

		/**
		 * Utility to create a new assistant message.
		 *
		 * @param content The content of the message.
		 * @param name The optional name of a user for the message.
		 */
		static Assistant(content: string | Array<LanguageModelTextPart | LanguageModelToolCallPart | LanguageModelDataPart | LanguageModelExtraDataPart>, name?: string): LanguageModelChatMessage2;

		/**
		 * The role of this message.
		 */
		role: LanguageModelChatMessageRole;

		/**
		 * A string or heterogeneous array of things that a message can contain as content. Some parts may be message-type
		 * specific for some models.
		 */
		content: Array<LanguageModelTextPart | LanguageModelToolResultPart | LanguageModelToolCallPart | LanguageModelDataPart | LanguageModelExtraDataPart>;

		/**
		 * The optional name of a user for this message.
		 */
		name: string | undefined;

		/**
		 * Create a new user message.
		 *
		 * @param role The role of the message.
		 * @param content The content of the message.
		 * @param name The optional name of a user for the message.
		 */
		constructor(role: LanguageModelChatMessageRole, content: string | Array<LanguageModelTextPart | LanguageModelToolResultPart | LanguageModelToolCallPart | LanguageModelDataPart | LanguageModelExtraDataPart>, name?: string);
	}

	/**
 * A language model response part containing an image, returned from a {@link LanguageModelChatResponse}.
 */
	export class LanguageModelDataPart {
		/**
		 * The image content of the part.
		 */
		value: ChatImagePart;

		/**
		 * Construct an image part with the given content.
		 * @param value The image content of the part.
		 */
		constructor(value: ChatImagePart);
	}

	/**
	 * Enum for supported image MIME types.
	 */
	export enum ChatImageMimeType {
		PNG = 'image/png',
		JPEG = 'image/jpeg',
		GIF = 'image/gif',
		WEBP = 'image/webp',
		BMP = 'image/bmp',
	}

	export interface ChatImagePart {
		/**
		 * The image's MIME type.
		 */
		mimeType: ChatImageMimeType;

		/**
		 * The raw binary data of the image, encoded as a Uint8Array. Note: do not use base64 encoding. Maximum image size is 5MB.
		 */
		data: Uint8Array;
	}

	/**
	 * Tagging onto this proposal, because otherwise managing two different extensions of LanguageModelChatMessage could be confusing.
	 * A language model response part containing arbitrary model-specific data, returned from a {@link LanguageModelChatResponse}.
	 * TODO@API naming, looking at LanguageModelChatRequestOptions.modelOptions, but LanguageModelModelData is not very good.
	 * LanguageModelOpaqueData from prompt-tsx?
	 */
	export class LanguageModelExtraDataPart {
		/**
		 * The type of data. The allowed values and data types here are model-specific.
		 */
		kind: string;

		/**
		 * Extra model-specific data.
		 */
		data: any;

		/**
		 * Construct an extra data part with the given content.
		 * @param value The image content of the part.
		 */
		constructor(kind: string, data: any);
	}
}
