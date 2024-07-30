import React from 'react';
import { toast } from 'react-toastify';

const useApiRequest = () => {
    const [loading, setLoading] = React.useState(true);

    const fetchData = async (
        url,
        urlData = {},
        onSuccess = () => {},
        onError = () => {}
    ) => {
        try {
            const res = await fetch(url, urlData);
            const body = res.status === 204 ? null : await res.json();

            if (res.ok) {
                onSuccess(body);
                setLoading(false);
            } else {
                onError(body);
            }
        } catch (error) {
            toast.error(error.message);
            onError(error);
        }
    };

    return { fetchData, loading };
};

export default useApiRequest;
