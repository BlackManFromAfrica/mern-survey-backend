import PollModel from '../models/Poll.js'

export const create = async (req, res) => {

    try {
        const doc = new PollModel({
            title: req.body.title,
            description: req.body.description,
            pages: req.body.pages,
            user: req.userId,
            logo: req.body.logo,
        })

        const poll = await doc.save()
        res.json(poll)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Не удалось создать опрос"
        })
    }
}

export const getAll = async (req, res) => {
    try {
        const polls = await PollModel.find().populate('user').exec();
        res.json(polls)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Не удалось получить опросы"
        })
    }
}

export const getOne = async (req, res) => {
    try {
        const pollId = req.params.id;

        PollModel.findByIdAndUpdate({
            _id: pollId,

        }, {
            $inc: { viewsCount: 1 },
        }, {
            returnDocument: 'after',
        }, (err, doc) => {
            if (err) {
                console.log(err)
                return res.status(500).json({
                    message: "Не удалось вернуть опрос"
                })
            }

            if (!doc) {
                return res.status(404).json({
                    message: 'Опрос не найден',
                })
            }
            res.json(doc)
        })
    } catch (error) {
        console.log(err)
        res.status(500).json({
            message: "Не удалось получить опрос"
        })
    }
}
export const remove = async (req, res) => {
    try {
        const pollId = req.params.id;

        PollModel.findByIdAndDelete({
            _id: pollId,
        }, (err, doc) => {
            if (err) {
                console.log(err)
                return res.status(500).json({
                    message: "Не удалось удалить опрос"
                });
            }
            if (!doc) {
                return res.status(404).json({
                    message: "Опрос не найден",
                })
            }
            res.json({
                success: true,
            })
        },)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Не удалось получить опрос"
        })
    }
}
export const update = async (req, res) => {
    try {
        const pollId = req.params.id;
        await PollModel.updateOne({
            _id: pollId,
        }, {
            results: req.body.results
        })

        res.json({
            success: true,
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Не удалось обновить опрос"
        })
    }
}
