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
