// #ifdef H5
import Cookies from "js-cookie";
// #endif

const storage={
	set(key,value){
		// #ifdef H5
		Cookies.set(key,value,{ path: '/'})
		// #endif
		// #ifdef APP
			uni.setStorageSync(key,value);
		// #endif
	},
	get(key){
		// #ifdef H5
		return Cookies.get(key)
		// #endif
		// #ifdef APP
		return uni.getStorageSync(key)
		// #endif
	}
}

export default storage;