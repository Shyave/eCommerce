import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";

const types = {
    INPUT: "input",
    SELECT: "select",
    TEXTAREA: "textarea"
}

const CommonForm = ({formControls, formData, setFormData, onSubmit, buttonText, buttonEnable}) => {
    const renderInputsByComponentType = (getControlItem) => {
        let element = null;
        const value = formData[getControlItem.name] || ''

        switch (getControlItem.componentType) {
            case types.INPUT: 
                element = (
                    <Input 
                        name={getControlItem.name} 
                        placeholder={getControlItem.placeholder} 
                        id={getControlItem.name} 
                        type={getControlItem.type}
                        value={value}
                        onChange={event => setFormData({
                            ...formData,
                            [getControlItem.name] : event.target.value
                        })}>
                    </Input>
                )
                break;
            
            case types.SELECT: 
                element = (
                    <Select value={value} onValueChange={(value) => {
                        setFormData({
                        ...formData,
                        [getControlItem.name] : value
                        })
                    }}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder={getControlItem.placeholder}></SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                            {
                                getControlItem?.options && getControlItem?.options?.length ? 
                                    getControlItem?.options?.map((optionItem) => {
                                        return <SelectItem key={optionItem.id} value={optionItem.id}>{optionItem.label}</SelectItem>
                                    }) : null
                            }
                        </SelectContent>
                    </Select>
                )
                break;

            case types.TEXTAREA: 
                element = (
                    <Textarea 
                        name={getControlItem.name} 
                        placeholder={getControlItem.placeholder} 
                        id={getControlItem.name} 
                        type={getControlItem.type}
                        value={value}
                        onChange={event => setFormData({
                            ...formData,
                            [getControlItem.name] : event.target.value
                        })}>
                    </Textarea>
                )
                break;

            default:
                element = ( 
                    <Input 
                        name={getControlItem.name} 
                        placeholder={getControlItem.placeholder} 
                        id={getControlItem.name} 
                        type={getControlItem.type}
                        value={value}
                        onChange={event => setFormData({
                            ...formData,
                            [getControlItem.name] : event.target.value
                        })}>
                    </Input>
                )
                break;
        }
        return element;
    }

    console.log("buttonEnable - ", buttonEnable);
    
    return (
        <form onSubmit={onSubmit}>
            <div className="flex flex-col gap-6">
                {
                    formControls.map((controlItem) => {
                        return (
                            <div className="grid w-full gap-1.5" key={controlItem?.name}>
                                <Label className="text-start mb-1">{controlItem?.label}</Label>
                                {
                                    renderInputsByComponentType(controlItem)
                                }
                            </div>
                            )
                    })
                }
            </div>
            <Button type="submit" disabled={!buttonEnable} className={`${!buttonEnable} ? 'cursor-not-allowed : '' mt-6 w-full`}>{ buttonText || 'Submit' }</Button>
        </form>
    )
}

export default CommonForm;