# art.js
A small javascript app for handling images and directories for web portfolios.

Upload your images into any folder or subfolder and have them show up on your webpage!

Titles for files and folders cannot include a single quote! '

Please note that any images beginning with "_" are treated as thumbnails.
If a particular image is not showing up, it may be because it begins with "_".

\~~~~~~~~THUMBNAILS~~~~~~~~

All thumbnails must be .jpg!

	FOLDER THUMBNAILS:
To create a thumbnail for a folder add a picture with the same name as the folder, and a .jpg extention.
Put the image in the same directory as the folder.
Example:<br />
	/images/2018/Painting<br />
	/images/2018/Painting.jpg <---- this is the thumbnail file<br />
	/images/2018/_Painting.jpg <---- also works

	IMAGE THUMBNAILS:
To create a thumbnail for an image, make a .jpg that has the same name as the file, but starts with an underscore. "_"
Example:<br />
	image.jpg <---- can be .jpg .jpeg .png or .gif<br />
	_image.jpg <---- thumbnail must be .jpg

	MOVIE THUMBNAILS:
Movie thumbnails must also start with an underscore "_" have the name as the mp4 or mov file, and must have .jpg extension.
Example:<br />
	movie.mp4 <---- can be .mp4 or .mov<br />
	_movie.jpg <---- thumbnail must be .jpg

Recommended Thumnail dimensions:<br />
	height: 240px<br />
	width: any<br />

(Thumbnails that are not 240px in height will be resized.)

\~~~~~~~~NAMING CONVENTIONS~~~~~~~~

Names of files and folders can include:<br />
	Letters<br />
	Numbers<br />
	Spaces<br />
	Hyphens (-)<br />
	Underscores(_) <---- .jpg files beginning with "_" will be treated as thumbnails<br />
!Important: Avoid using quotes (" and ') in names!<br />

\~~~~~~~~IMAGE SIZES~~~~~~~~

Reccommended: full sized images should be no larger than 1200px in height<br />

\~~~~~~~~VIDEO SIZE / COMPRESSION /FILE TYPES ~~~~~~~~

Reccommended: h.264 compression to save virtual space<br />

\~~~~~~~~ADDING CAPTIONS AND TITLES~~~~~~~~

1. Create a json file with the name "info.json"<br />
2. Fill it with text in json format starting with an array []:<br />
[<br />
	{<br />
		"filename": name-of-file,<br />
		"headline": headline/title,<br />
		"description": description or caption,<br />
		"status": "sold"/"available"/whatever<br />
	},<br />
	{ ... }, { ... }<br />
]<br />

Any field can be left blank. It will simply appear as empty space.
