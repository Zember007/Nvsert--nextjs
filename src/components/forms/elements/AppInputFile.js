import { useState } from "react";
import { useTranslation } from "react-i18next";


const AppInputFile = ({inputName,discount,required}) => {
    const [files, setFiles] = useState([]);
    const { t } = useTranslation()

    function fileInputHandler(event) {      
        let input = event.target;

        if (input.files.length === 0) {            
            setFiles([])
            return;
        }

        for (let i = 0; i < input.files.length; i++) {            
            setFiles([...files, {
                name: input.files[i].name,
                size: input.files[i].size,
            }])
        }

    }
    function formatBytes(bytes, decimals = 2) {
        if (!+bytes) return '0 Bytes'

        const k = 1024
        const dm = decimals < 0 ? 0 : decimals
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

        const i = Math.floor(Math.log(bytes) / Math.log(k))

        return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
    }
    function resetInputFile(event) {
        let fileInput = event.target.closest('.js-cost-calc__file').querySelector('.js-input-file');
        if (!fileInput) {
            return;
        }

        fileInput.value = "";

        let customEvent = new Event('change', {
            bubbles: true,
        });

        fileInput.dispatchEvent(customEvent);
    }
    return (
        <div className="cost-calc__file js-cost-calc__file">
            <label className="field" style={{ display: files.length !== 0 && 'none' }}>
                <input
                    type="file"
                    name={inputName}
                    onChange={(e) => fileInputHandler(e)}
                    className="js-input-file"
                    hidden multiple
                />
                <span className="cost-calc__file-btn" ><i className="icon icon--clip"></i>{t('calculation.form.placeholder.file_doc')}</span>
                <span className="cost-calc__file-desc">{
                    t('calculation.form.placeholder.file')
                }</span>
            </label>
            <div
                style={{ display: files.length <= 0 && 'none' }}
                className="files-preview">

                {files.map(file => <div className="files-preview__item" key={JSON.stringify(file)}>

                    <div className="top">
                        <i className="icon icon--file"></i>
                        {file.name}

                    </div>
                    <div className="info">{formatBytes(file.size)}</div>

                </div>)}

                <button type="button" style={{ display: files.length <= 0 && 'none' }} className="files-preview__reset"
                    onClick={(e) => resetInputFile(e)}
                >Удалить все</button>

            </div >
            {discount > 0 && <span className="discount" >+{discount}%</span>}
        </div >
    );
};

export default AppInputFile;