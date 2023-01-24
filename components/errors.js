export default function Label({ errors = [], ...props }) {
    return (
        <> 
            {errors.length > 0 && (
                <div {...props}>
                    <div className="font-medium text-red-600">
                        Whoops! Something went wrong.
                    </div>
                    
                    {/* <p className="text-sm text-red-600" aria-live="assertive">{errors}</p> */}

                    <ul className="mt-3 list-disc list-inside text-sm text-red-600">
                       
                        <li>{errors}</li>
                       
                    </ul>
                </div>
            )}
        </>
    )
}