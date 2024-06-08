import { ref, onMounted } from 'vue'
import axiosInstance from '@/services/api';
import { type Evaluation } from '@/types/user'

export default function useEvaluationsList() {
   
    const dataEvaluations = ref<Evaluation[]>([])
    const isload = ref(false)

    const getEvaluations = async () => {
        isload.value = true
        await axiosInstance.get('/api/evaluations/unit/2').then(
            response => (dataEvaluations.value = response.data.data, console.log(response.data.data)))
            .catch((error) => {
                console.log(error);
            });
            isload.value = false
    }
    

    onMounted(getEvaluations)

    return {
        dataEvaluations,
        isload
    }

}