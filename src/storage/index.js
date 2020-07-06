// storage 封装

const STORAGE_KEY = 'mall'

export default {
    // 获取某个模块下面的某个值
    getItem(key, module_name) {
        let storageVal = this.getStorage()
        if(module_name) {
            let moduleVal = storageVal[module_name]
            if(val) return moduleVal[key]
        }
        return storageVal[key]
    },
    // 存储值
    setItem(key, value, module_name) {
        if(module_name) {
            let val = this.getItem(module_name)
            val[key] = val
            this.setItem(module_name, val)
        } else {
            let val = this.getStorage()
            val[key] = value
            window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(val)) 
        }
    },
    // 获取整个storage
    getStorage() {
        return JSON.parse(window.sessionStorage.getItem(STORAGE_KEY) || '{}')
    },
    // 清除某个模块下的某个值
    clear(key, module_name) {
        let storageVal = this.getStorage()
        if(module_name) {
            if(!storageVal[module_name]) return
            delete storageVal[module_name][key]
        } else {
            if(storageVal[key]) delete storageVal[key]
        }
        window.sessionStorage.setItem(STORAGE_KEY, JSON.parse(STORAGE_KEY))
    }
}

