function doGet() { 
  return HtmlService.createTemplateFromFile("getSsUrl").evaluate(); 
}

function test(){
  var logSheet = SpreadsheetApp.getActiveSheet();
  var lastRow = logSheet.getLastRow();
  var lastCol = logSheet.getLastColumn();
  logSheet.getRange(2,1,1,2).insertCells(SpreadsheetApp.Dimension.COLUMNS)
  //logSheet.getRange(1,2,1,2).setValues([['回答率:','パーセント']]);
}
function doPost(postdata){
  var url = postdata.parameters.url;
  var ssUrl = url[0];
  Logger.log(ssUrl);
  //var sheet = getUrlToSheet(ssUrl);
  var logSheet = SpreadsheetApp.getActiveSheet();
  var lastRow = logSheet.getLastRow();
  var lastCol = logSheet.getLastColumn();
  //var ssUrl = 'https://docs.google.com/spreadsheets/d/1g7KeV9neH1kWX5fPRZZ6HWJc5XdGnogGWwvyrSvQoP8/edit#gid=0'
  //Logger.log(ssUrl);
  //未回答者を取得し、webに表示する
    var yetNames = getYetNames(ssUrl);
    var percent = getPercent(ssUrl);
    //Logger.log(yetNames);
    logSheet.appendRow(yetNames);
    var lastRow = logSheet.getLastRow();
    var key = logSheet.getRange(lastRow,1).getValue();
    if(key != '送信を押すと未回答者が記録されます'){
      logSheet.getRange(lastRow,1,1,1).insertCells(SpreadsheetApp.Dimension.COLUMNS)
      logSheet.getRange(lastRow,1,1,1).setValues([['回答率:'+ percent + '％']]);
    } 
  //送信スイッチがオンだった場合、LINEに送信  
    var notifySwitch = postdata.parameters.notifySwitch[0];//[0忘れんな！！]
    if(notifySwitch == '1'){
      lineNotify(ssUrl);
      Logger.log('LINE通知プログラムを作動させました\n' + ssUrl);
    }
    Logger.log(notifySwitch);
  var resultpage = HtmlService.createTemplateFromFile('getSsUrl');
  return resultpage.evaluate(resultpage);
}
