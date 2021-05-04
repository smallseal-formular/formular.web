# 開發筆記

# Init Project
* vue create formular.web
* install viewUI and boostrap
    1. npm install plugin
       npm install bootstrap-vue 
       npm install view-design
    2. import view-design and boostrap in main.ts


# CORS
* 遇到以下錯誤訊息 => 解決方法為設定後端的 CORS
```
XMLHttpRequest at 'http://localhost:5000/api/azure/vm/table/getcolumn' from origin 'http://localhost:8080' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

# 放置在 public 的 config 檔案
* 放置在 public 的檔案，對於前端 server 而沿路徑是 /file_path
* 讓 config 可以再啟動前端連線後才取得的方法，流程如下
    1. (public/appConfig.json) 將要在 run time 才得的 config 放置在 public 路徑下
    2. (main.ts) 在 vue 啟動前，先透過 axios 打前端伺服器自己的 get，取得 config 檔案
    3. (main.ts) 確認取得 (promise.then()) 後，才 create Vue 物件，產生前端頁面
    4.(configGetter.ts) 這個檔案就是用來產生 create vue 物件前的 promise
        * getConfig => 透過 axios.get('/appConfig.json') 取得 config 檔案
        * configGetterPromise => 確保取得 config 後才做後面的事(建立 vue 物件)