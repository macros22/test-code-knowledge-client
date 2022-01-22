

interface IProps {
    name: string;
    value: any;
    checked: boolean;
    onChange: any;
}

const Checkbox: React.FC<IProps> = ({ name, value, checked, onChange }) => {
    return (
        <>

            {/* <label className="container">Four
                <input type="checkbox"
                    name={name}
                    value={name}
                    checked={checked}
                    onChange={onChange} />
                <span className="checkmark"></span>
            </label> */}

            <label className="form-control">
                <input type="checkbox" name="checkbox" value={value}
                    checked={checked}
                    onChange={onChange} />
                <span>{name}</span>
            </label>

        </>
    );

}

export default Checkbox;



// <label className="form-control">
//                 <input type="checkbox" name="checkbox" />
//                 Checkbox
//             </label>

//             <label className="form-control">
//                 <input type="checkbox" name="checkbox-checked" checked />
//                 Checkbox - checked
//             </label>

//             <label className="form-control form-control--disabled">
//                 <input type="checkbox" name="checkbox-disabled" disabled />
//                 Checkbox Disabled
//             </label>

//             <label className="form-control form-control--disabled">
//                 <input type="checkbox" name="checkbox-disabled-checked" checked disabled />
//                 Checkbox Disabled - checked
//             </label>