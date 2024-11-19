import {defineStore} from "pinia"

export const useTaskStore = defineStore("task", {
    state: () => ({
        tasks: []
    }),
    actions: {
        async getAllTask(){
            try {
                const config = useRuntimeConfig();
                const baseUrl = config.public.apiBaseUrl;
                const data = await useFetch(
                  `${baseUrl}/task`,
                  {
                    method: "POST",
                  }
                );
            }
            catch(error : any){
                const errorData = error.response._data;
            }
        }
    }
})