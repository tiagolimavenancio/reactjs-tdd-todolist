import React, { useState } from 'react';

export default function UseModalManagement() {
    const [isModalOpened, setModalVisibility] = useState(false);

    function openModal() {
        setModalVisibility(true);
    }

    function closeModal() {
        setModalVisibility(false);
    }

    return {
        isModalOpened,
        openModal,
        closeModal
    }
}