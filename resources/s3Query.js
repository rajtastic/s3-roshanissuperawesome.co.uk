(function($){
    "use strict";
    var FOLDER_PATTERN = new RegExp('_\\$folder\\$$');
    var TYPE_PATTERN = new RegExp('\\.([^\\.\\s]{1,10})$');
    var KB = 1024;
    var MB = 1000000;
    var GB = 1000000000;

    // replace last /index.html to get bucket root
    var bucketUrl = "http://www.roshanissuperawesome.co.uk.s3-eu-west-1.amazonaws.com/";
    var compiledTemplate;

    // return e.g. 1.2KB, 1.3MB, 2GB, etc.
    function toFriendlySizeName(size){
      if (size === 0) {
        return '';
      } else if (size < KB) {
        return size + ' B';
      } else if (size < MB) {
        return (size / KB).toFixed(0) + ' KB';
      } else if (size < GB) {
        return (size / MB).toFixed(2) + ' MB';
      }
      return (size / GB).toFixed(2) + ' GB';
    }


    // POJO describing a file or a folder
    function FileOrFolder(lastModified, etag, size, key){
      var self = this;

      self.lastModified = lastModified;
      self.etag = etag;
      self.size = size;
      self.key = key;

      // init logic
      self.isFolder = FOLDER_PATTERN.test(self.key);
      self.filename = self.isFolder ? self.key.replace(FOLDER_PATTERN,'') : self.key;
      self.url = bucketUrl + '/' + self.key;
      self.levels = self.filename.split('/');
      self.numLevels = self.levels.length;
      self.simpleFilename = self.levels[self.numLevels - 1];
      self.friendlySizeName = toFriendlySizeName(parseInt(self.size,10));
      var foundTypes = TYPE_PATTERN.exec(self.simpleFilename);
      self.type = self.isFolder ? 'Folder ' : (foundTypes ? (foundTypes[1].toUpperCase() + ' file') : 'Unknown');
      self.friendlyLastModified = moment(lastModified).format('MMM Do YYYY, hh:mm:ss a');
    }

    function onAjaxSuccess(xml) {
      var listBucketResult = $(xml).find('ListBucketResult');

      // set a reasonable title instead of "Bucket loading"
      var title = 'roshanissuperawesome.co.uk';
      document.title = title;
      $('#h1-title').text(title);

      var $tbodyContent = $('#tbody-content');

      // create the file or folder objects

      window.filesOrFolders = [];

      listBucketResult.find('Contents').each(function(idx, element){

        var $element = $(element);

        var fileOrFolder = new FileOrFolder(
           $element.find('LastModified').text(),
           $element.find('ETag').text(),
           $element.find('Size').text(),
           $element.find('Key').text()
        );

        filesOrFolders.push(fileOrFolder);
      });

      // Build Tree
      window.navTree = s3TreeBuild(filesOrFolders);
      $('#tree').treeview({data: navTree,enableLinks:true});
    }

    $.ajax({
         url: bucketUrl,
         success: onAjaxSuccess
    });
    
  })(jQuery);