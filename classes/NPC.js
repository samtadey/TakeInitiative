export default class NPC {
    constructor() {
        this.name = '';
        this.type = '';
        this.health = '';
        this.initiative = '';
        this.legendary = false;
        this.leg_actions = '';
        this.leg_resist = '';
    }

    setName = function (name) {
        this.name = name;
    };
    setType = function (type) {
        this.type = type;
    };
    setHealth = function (health) {
        this.health = health;
    };
    setInitiative = function (init) {
        this.initiative = init;
    };
    setLeg = function (is_leg) {
        this.legendary = is_leg;
    }
    setActions = function (actions) {
        this.leg_actions = actions;
    }
    setResist = function (resistances) {
        this.leg_resist = resistances;
    }
}