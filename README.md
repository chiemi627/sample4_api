# 最初の設定
## 大学の学科計算機室で動かす場合
 ~/.bash_profileというファイルを開き（なければ作る）、以下の１行を足す
 ```
 export PATH=$PATH:~chiemi/lib/npm/bin
 ```
 
 保存したら、以下を実行
 ```
 % source ~/.bash_profile
 ```

## 自分のPCで動かす場合
* Node.js をインストール https://nodejs.org/ja/

# とりあえず動かしてみる
 1. 必要なモジュールをインストールする
 ```
 % npm install
 ```
 2. Webサーバを立ち上げる
 ```
 % node app.js
 ```
 3. ブラウザで http://localhost:3000 にアクセスしてみる
 
# 使用しているツール
* node.js: 非同期型のイベント駆動のJavaScript環境。これでWebサーバを起動し、サーバ側のプログラムをJavaScriptで動作させる。
  * https://nodejs.org/ja/about/
* Express： Node.js用のWebフレームワーク。内部プログラムと表示プログラム（HTMLの構成）を分離してかける。
  * https://expressjs.com/
* Materialize.css : CSS用のフレームワーク。Googleが提唱するマテリアルデザインにに基づいている。
  * https://materializecss.com/
* PUG : HTMLをもっとシンプル書くためのフレームワーク。Javascriptのコードや変数を埋め込むことができる。
  * https://pugjs.org


# どこに何が書かれているの？
* app.js
  * URLが指定された時に何を動かして何を返せばいいかが書かれている
* views/index.pug
  * http://localhost:3000 にアクセスした時に表示されるHTML（をpugでシンプルに書いたもの）
