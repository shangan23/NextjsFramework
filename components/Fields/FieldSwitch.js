import { Switches } from 'mui-rff';

export default function FieldCheckbox() {
    return (<Switches
        label="Check at least one..."
        name="best"
        required={true}
        data={SwitchData}
    />);
}