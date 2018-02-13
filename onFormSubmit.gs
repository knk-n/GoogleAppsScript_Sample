// 自動返信メールの設定

function onFormSubmit(e) {

    try {
        // fromアドレスはトリガー設定者のアドレスになるので注意
        // toが取得できないときは管理者をtoにしてメールを送ります

        // ▼▼▼初期設定▼▼▼

        // メール送信先の設定
        var admin = ""; //管理者メールアドレス

        var cc = ""; // Cc:
        var bcc = admin; // Bcc:
        var to = ""; // To: （フォーム入力者のアドレスは自動取得されます)

        var seminar_title = "【セミナータイトル】";
        var username = "";
        var usercompany = "";

        // 件名、本文の設定
        //改行するには \n を入れてください
        var subject = "[" + seminar_title + "]お申込み完了"; //件名
        var header = "「" + seminar_title + "」のお申し込みありがとうございます。\n\n下記内容で受付致しました。\n\n==============================\n"; //本文のヘッダー
        var footer = "==============================\n\nそれでは当日お会いできることを楽しみにしております。\n--------------------\n" + seminar_title + "\n【Googleフォームの短縮リンク】\n\n***********************************\n◯△×株式会社\nTEL XXX-XXX-XXX\n〒XXX-XXXX\n東京都新宿区◯△× ◯△×\n***********************************\n\n※本メールはシステムによる自動送信となっております。\n本メールには返信しないようお願い申し上げます。"; //本文のフッター
        var body = ""; //本文

        // ▼▼▼メール送信処理▼▼▼
        var FORM_DATA = e.response.getItemResponses();
        body += header;

        // 入力項目を本文に埋め込む
        for (var j = 0; j < FORM_DATA.length; j++) {
            body += "■" + FORM_DATA[j].getItem().getTitle() + "\n";
            body += FORM_DATA[j].getResponse() + "\n\n";;
            //入力されたメールアドレスをtoに入れる
            if (FORM_DATA[j].getItem().getTitle() == "Eメールアドレス" && FORM_DATA[j].getResponse() != "") {
                to = FORM_DATA[j].getResponse() + ",";
            } else if (FORM_DATA[j].getItem().getTitle() == "申込者名" && FORM_DATA[j].getResponse() != "") {
                username = FORM_DATA[j].getResponse();
            } else if (FORM_DATA[j].getItem().getTitle() == "申込企業名" && FORM_DATA[j].getResponse() != "") {
                usercompany = FORM_DATA[j].getResponse();
            }
        }

        body = usercompany + "\n" + username + " 様\n\n" + body;

        body += footer;

        if (to == "") {
            to = admin;
        }

        MailApp.sendEmail(to, subject, body, { cc: cc, bcc: bcc }); //メールを送信

    } catch (e) {
        //エラーが発生した場合に管理者にメールを送信する
        MailApp.sendEmail(admin, "Error report", e.message);
    }

}