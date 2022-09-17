import React from 'react';
import { useUser } from 'hooks/useUser';
import { withLayout } from 'layouts';
import { useRouter } from 'next/router';

const ProfilePage = () => {
    const { user } = useUser();
    const router = useRouter();

    React.useEffect(() => {
        if (!user) {
            router.replace('auth/sign-in')
        }
    }, [user])

    return (
        <>
            <h4>email: {user?.email}</h4>
            <h4>name: {user?.name}</h4>
        </>
    );
};

export default withLayout('main', ProfilePage);

