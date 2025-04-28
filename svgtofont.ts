import svgtofont from 'svgtofont';

svgtofont({
	src: './src/assets/iconfont/src', // Path to your SVG icons
	dist: './src/assets/iconfont/public', // Output folder
	fontName: 'iconfont',        // Name of the font
	css: true
}).then(r => console.log(r));
