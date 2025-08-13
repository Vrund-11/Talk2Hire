"use client";
import { UserDetailsContext } from '@/contexts/UserDetailsContext';
import { supabase } from '@/services/supabaseClient'
import React, { useEffect, useState } from 'react'

const Provider = ({ children }) => {

    const [user, setUser] = useState();

    useEffect(() => {
        createNewUser();
    }, []);

    //Create a user 
    const createNewUser = () => {

        supabase.auth.getUser().then(async ({ data: { user } }) => {
            // let Users = null;

            //check if user exists
            let { data: Users, error } = await supabase
                .from('Users')
                .select("*")
                .eq('email', user?.email)
            //Users = data;
            console.log('already user: ', Users);


            //if user does not then
            if (Users?.length == 0) {
                const { data, error } = await supabase.from('Users')
                    .insert([
                        {
                            name: user?.user_metadata?.name,
                            email: user?.email,
                            picture: user?.user_metadata?.picture,
                        }
                    ])
                console.log(data);
                setUser(data);
                return;
            }
            setUser(Users[0])
        })
    }

    return (
        <UserDetailsContext.Provider value={{ user, setUser }}>
            <div>{children}</div>
        </UserDetailsContext.Provider>
    )
}

export default Provider;
