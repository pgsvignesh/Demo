/**
 * A controller class that zip all attachments of object (Id=0011000000uzA9u),
 * and redirect to download url.
 */
public with sharing class ApexZipSampleController {

  public ApexZipSampleController() {
  }
  
  /**
   * Zip files and redirect to download url of zip ducument
   * @return [description]
   */
  public PageReference downloadAttachments(){
    String objectId = '0015000001EsZb3'; // your object's Id
    String docName = 'apex-zip-sample.zip'; // Document's name
    List<Attachment> attachments = [SELECT Name, Body FROM Attachment WHERE ParentId = :objectId];
    System.debug('>>> attachments ' + attachments.size());
    Zippex sampleZip = new Zippex();
    for(Attachment file : attachments) {
      sampleZip.addFile('folder/' + file.Name, file.Body, null);
    }
    try{
      Document doc = new Document();
      doc.FolderId = UserInfo.getUserId();
      doc.Name = docName;
      doc.Body = sampleZip.getZipArchive();
      insert doc;
      System.debug('>>> doc ' + doc.Id);
      return new PageReference('/servlet/servlet.FileDownload?file=' + doc.Id);
    } catch ( Exception ex ) {
      System.debug('>>> ERROR ' + ex);
    }
    return null;
  }
}