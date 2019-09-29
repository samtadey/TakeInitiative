import strings from '../constants/Strings'

export default {
    //MNF and PNF Functions

    updateSelf(self, id, label, text, list, action) {
        self[label] = text;
        action(id, self, list);
    },

// updateSelf(npc, id, label, text) {
//         npc[label] = text;
//         this.props.updt(id, npc, "npcs")
//     }

    //CEM Functions
    updateFormItem(id, npcs, form) {
        form[id] = npcs;
        return form;
    },

    deleteFormItem(id, form) {
        form.splice(id,1);
        return form;
    },

    validateForm(npcs, adventurers) {
        let i, msg = "", name = false, initiative = false;

        for (i = 0; i < npcs.length; i++)
        {
            npcs[i].img_key = strings.keys.monster_img;
            if (!npcs[i].name)
                name = true;
            if (!npcs[i].initiative)
                initiative = true;
            
        }
        for (i = 0; i < adventurers.length; i++)
        {
            if (!adventurers[i].img_key)
                adventurers[i].img_key = strings.keys.adv_img;
            if (!adventurers[i].name)
                name = true;
            if (!adventurers[i].initiative)
                initiative = true;
        }

        if (name)
            msg+=strings.validation_msg.name + "\n";
        if (initiative)
            msg+=strings.validation_msg.initiative + "\n";

        //alert(msg);
        return msg;   
    }
}