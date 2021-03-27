# art.js
A small javascript app for handling images and directories for web portfolios.

Titles for files and folders cannot include a single quote! '

Please note that any images beginning with "_" are treated as thumbnails.
If a particular image is not showing up, it may be because it begins with "_".

\~~~~~~~~THUMBNAILS~~~~~~~~

All thumbnails must be .jpg!

	FOLDER THUMBNAILS:
To create a thumbnail for a folder add a picture with the same name as the folder, and a .jpg extention.
Put the image in the same directory as the folder.
Example:
	/images/2018/Painting
	/images/2018/Painting.jpg <---- this is the thumbnail file
	/images/2018/_Painting.jpg <---- also works

	IMAGE THUMBNAILS:
To create a thumbnail for an image, make a .jpg that has the same name as the file, but starts with an underscore. "_"
Example:
	image.jpg <---- can be .jpg .jpeg .png or .gif
	_image.jpg <---- thumbnail must be .jpg

	MOVIE THUMBNAILS:
Movie thumbnails must also start with an underscore "_" have the name as the mp4 or mov file, and must have .jpg extension.
Example:
	movie.mp4 <---- can be .mp4 or .mov
	_movie.jpg <---- thumbnail must be .jpg

Recommended Thumnail dimensions:
	height: 240px
	width: any

(Thumbnails that are not 240px in height will be resized.)

\~~~~~~~~NAMING CONVENTIONS~~~~~~~~

Names of files and folders can include:
	Letters
	Numbers
	Spaces
	Hyphens (-)
	Underscores(_) <---- .jpg files beginning with "_" will be treated as thumbnails
!Important: Avoid using quotes (", ') in names!

\~~~~~~~~IMAGE SIZES~~~~~~~~

Reccommended: full sized images should be no larger than 1200px in height

\~~~~~~~~VIDEO SIZE / COMPRESSION /FILE TYPES ~~~~~~~~

Reccommended: h.264 compression to save virtual space

\~~~~~~~~ADDING CAPTIONS AND TITLES~~~~~~~~

1. Create a json file with the name "info.json"
2. Fill it with text in json format starting with an array []:
[
	{
		"filename": name-of-file,
		"headline": headline/title,
		"description": description or caption,
		"status": "sold"/"available"/whatever
	},
	{ ... }, { ... }
]

Any field can be left blank. It will simply appear as empty space.
