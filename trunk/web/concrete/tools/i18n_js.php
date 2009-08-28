<? header('Content-type: text/javascript'); ?>

var ccmi18n = { 
	
	deleteBlock: '<?=t('Delete')?>',
	closeWindow: '<?=t('Close')?>',
	editBlock: '<?=t('Edit')?>',
	compareVersions: '<?=t('Compare Versions')?>',
	blockAreaMenu: '<?=t("Add Block")?>',
	arrangeBlock: '<?=t('Move')?>',
	copyBlockToScrapbook: '<?=t('Copy to Scrapbook')?>',
	changeBlockTemplate: '<?=t('Custom Template')?>',
	changeBlockCSS: "<?=t("Custom Design")?>",
	changeBlockBaseStyle: "<?=t("Set Block's Base Styles")?>",
	confirmBlockCssReset: "<?=t("Are you sure you want to remove all of this block's styles?")?>",
	setBlockPermissions: '<?=t('Set Permissions')?>',
	setBlockAlias: '<?=t('Setup on Child Pages')?>',	
	helpPopup: '<?=t('Help')?>',
	noIE6: '<?=t('Concrete5 does not support Internet Explorer 6 in edit mode.')?>',
	helpPopupLoginMsg: '<?=t('Get more help on your question by posting it to the concrete5 help center on concrete5.org')?>',
	marketplaceErrorMsg: '<?=t('<p>You package could not be installed.  An unknown error occured.</p>')?>',
	marketplaceInstallMsg: '<?=t('<p>Your package will now be downloaded and installed.</p>')?>',
	marketplaceLoadingMsg: '<?=t('<p>Retrieving information from the Concrete5 Marketplace.</p>')?>',
	marketplaceLoginMsg: '<?=t('<p>You must be logged into the concrete5 Marketplace to install add-ons and themes.  Please log in.</p>')?>',
	marketplaceLoginSuccessMsg: '<?=t('<p>You have successfully logged into the concrete5 Marketplace.</p>')?>',
	marketplaceLogoutSuccessMsg: '<?=t('<p>You are now logged out of concrete5 Marketplace.</p>')?>',
	deleteAttributeValue: '<?=t('Are you sure you want to remove this value?')?>',
	customizeSearch: '<?=t('Customize Search')?>',
	properties: '<?=t('Properties')?>',
	ok: '<?=t('Ok')?>',
	x: '<?=t('x')?>'
}

var ccmi18n_sitemap = {

	visitExternalLink: '<?=t('Visit')?>',
	editExternalLink: '<?=t('Edit External Link')?>',
	deleteExternalLink: '<?=t('Delete')?>',
	addExternalLink: '<?=t('Add External Link')?>',
	
	visitPage: '<?=t('Visit')?>',
	pageProperties: '<?=t('Properties')?>',
	setPagePermissions: '<?=t('Set Permissions')?>',
	pageDesign: '<?=t('Design')?>',
	pageVersions: '<?=t('Versions')?>',
	deletePage: '<?=t('Delete')?>',
	addPage: '<?=t('Add Page')?>',
	moveCopyPage: '<?=t('Move/Copy')?>',
	reorderPage: '<?=t('Change Page Order')?>',
	reorderPageMessage: '<?=t('Move or reorder pages by dragging their icons.')?>',
	moveCopyPageMessage: '<?=t('Choose a new parent page from the sitemap.')?>',
	
	searchPages: '<?=t('Search Pages')?>',
	backToSitemap: '<?=t('Back to Sitemap')?>',
	searchResults: '<?=t('Search Results')?>',
	createdBy: '<?=t('Created By')?>',
	
	viewing: '<?=t('Viewing')?>',
	results: '<?=t('Result(s)')?>',
	max: '<?=t('max')?>',
	noResults: '<?=t('No results found.')?>',
	areYouSure: '<?=t('Are you sure?')?>',
	loadError: '<?=t('Unable to load sitemap data. Response received: ')?>',
	on: '<?=t('on')?>'
	
	
}

var ccmi18n_spellchecker = {

	resumeEditing: '<?=t('Resume Editing')?>',
	noSuggestions: '<?=t('No Suggestions')?>'
	
}

var ccmi18n_filemanager = {
	
	view: '<?=t('View')?>',
	download: '<?=t('Download')?>',
	select: '<?=t('Choose')?>',
	clear: '<?=t('Clear')?>',
	edit: '<?=t('Edit')?>',
	replace: '<?=t('Replace')?>',
	chooseNew: '<?=t('Choose New File')?>',
	sets: '<?=t('Sets')?>',
	permissions: '<?=t('Access & Permissions')?>',
	deleteFile: '<?=t('Delete')?>',
	title: '<?=t('File Manager')?>',
	uploadErrorChooseFile: '<?=t('You must choose a file.')?>',
	rescan: '<?=t('Rescan')?>',
	pending: '<?=t('Pending')?>',
	uploadComplete: '<?=t('Upload Complete')?>',
	
	PTYPE_CUSTOM: '<?=FilePermissions::PTYPE_CUSTOM?>',
	PTYPE_NONE: '<?=FilePermissions::PTYPE_NONE?>',
	PTYPE_ALL: '<?=FilePermissions::PTYPE_ALL?>',

	FTYPE_IMAGE: '<?=FileType::T_IMAGE?>',	
	FTYPE_VIDEO: '<?=FileType::T_VIDEO?>',	
	FTYPE_TEXT: '<?=FileType::T_TEXT?>',	
	FTYPE_AUDIO: '<?=FileType::T_AUDIO?>',	
	FTYPE_DOCUMENT: '<?=FileType::T_DOCUMENT?>',	
	FTYPE_APPLICATION: '<?=FileType::T_APPLICATION?>'
	
}
