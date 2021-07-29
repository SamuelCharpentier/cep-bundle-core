import { XMLElement } from './XMLElement';
import { ScreenPercentage, Size, MinSize, MaxSize } from './Size';
import type { Sizes } from './typesAndValidators';
import { badArgumentError } from './errorMessages';
export class Geometry extends XMLElement {
	constructor(content: Sizes | Sizes[]) {
		if (content instanceof ScreenPercentage) content = [content];
		if (content instanceof Size) content = [content];
		if (content instanceof MinSize) content = [content];
		if (content instanceof MaxSize) content = [content];
		if (!(content instanceof Array))
			throw new Error(
				badArgumentError(
					"Geometry's content",
					'array or instance of any of the following: ScreenPercentage, Size, MinSize, MaxSize',
					content,
				),
			);
		console.log(content);
		for (const element of content) {
			if (
				!(element instanceof ScreenPercentage) ||
				!(element instanceof Size) ||
				!(element instanceof MinSize) ||
				!(element instanceof MaxSize)
			)
				throw new Error(
					badArgumentError(
						"Geometry's content",
						'array or instance of any of the following: ScreenPercentage, Size, MinSize, MaxSize',
						content,
					),
				);
		}

		super({ name: 'Geometry', content });
	}
}
