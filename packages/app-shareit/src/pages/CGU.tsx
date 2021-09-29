import React from 'react';
import NavigationLayout from "../components/NavigationLayout";


function CGU() {

    // @ts-ignore
    return (
        <NavigationLayout title="Conditions générales d'utilisation">
        <div className='flex flex-col justify-center items-center w-full h-screen py-4 bg-gray-100'>
            <div className='h-1/3 my-8 flex items-center'>
                <img src='logo.png' alt='logo' className="relative w-64" />
            </div>
            <div className="flex flex-col flex-grow ">
                <label className="label text-center w-full relative">L'application Share'it respecte les conditions générales d'utilisation et préserve la sécurité ainsi que l'intégrité des données utilisateurs qui transitent via nos services conformément à la loi
                 <a href="https://www.cnil.fr/fr/comprendre-le-rgpd" className="text-blue-500 no-underline hover:underline"> RGPD</a> du 25 mai 2018.</label>
            </div>
        </div>
        </NavigationLayout>
    );

}

export default CGU;
