interface FormFieldProps {
    header: string;
    placeholder: string;
}

const FormField: React.FC<FormFieldProps> = ({ header, placeholder}) => {
    return (
        <div className="w-full mt-8">
            <label className="block text-white text-lg font-bold mb-2 " htmlFor="username">
                {header}
            </label>
            <textarea 
                className="bg-white text-gray-700 w-full border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white resize-none" 
                id="grid-first-name" 
                rows={6}
                placeholder={placeholder}
            />
        </div>
    );
}

export default FormField;