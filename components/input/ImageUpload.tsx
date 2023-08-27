import React from 'react'

import { CldUploadWidget } from 'next-cloudinary'
import Image from 'next/image'
import { useCallback } from 'react'
import {TbPhotoPlus} from 'react-icons/tb'

declare global {
    var cloudinary: any;
}

interface ImageUploadProps {
    onChange: (value: string) => void
    value: string 
}

const ImageUpload:React.FC<ImageUploadProps> = ({
    onChange,
    value
}) => {
    const handleUpload = useCallback((result: any) => {
        onChange(result.info.secure_url)
    }, [onChange])

    return (
        <CldUploadWidget
        onUpload={handleUpload}
        uploadPreset='fn4yyw2l'
        options={{
            maxFiles:1
        }}
    )
}