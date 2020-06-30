import { PostProcessorModule } from "i18next";

interface IntervalPluralOptions {
	intervalSeparator: string;
	intervalRegex: RegExp;
	intervalSuffix: string;
}

const intervalPlural: PostProcessorModule & {
	name: 'interval';
	type: 'postProcessor';
	options: IntervalPluralOptions;
	setOptions: (options: Partial<IntervalPluralOptions>) => void;
};

export default intervalPlural;
