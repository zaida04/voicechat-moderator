import Guild from "../Database/Models/Guild";
class DatabaseGuildManager {
    constructor() {}
    get(id: string) {
        return Guild.findById(id);
    }
    create(id: string) {
        return new Guild({
            _id: id,
            settings: {
                prefix: "g!",
                threshold: "medium",
                punishment: "vc_mute",
                notify: null,
            },
        }).save();
    }
    async edit(
        id: string,
        {
            prefix = null,
            threshold = null,
            punishment = null,
            notify = null,
        }: { prefix: string | null; threshold: string | null; punishment: string | null; notify: string | null }
    ) {
        let update: any = {};
        prefix ? (update["settings.prefix"] = prefix) : null;
        threshold ? (update["settings.threshold"] = threshold) : null;
        punishment ? (update["settings.punishment"] = punishment) : null;
        notify ? (update["settings.notifyChannel"] = notify) : null;
        return await Guild.findByIdAndUpdate(id, update);
    }
    delete(id: string) {
        return Guild.findByIdAndDelete(id);
    }
}
export default DatabaseGuildManager;
