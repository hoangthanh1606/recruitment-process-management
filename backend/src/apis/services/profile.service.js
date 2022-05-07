const { Profile } = require('../models')
const { sendMail } = require('./mail.service')
const uploadService = require('./upload.service')

/**
 * User apply to Campaign
 * @param {Object} profileBody
 * @returns {Promise<Profile>}
 */
const userCreateNewProfile = async (profileBody, full_name, email, file) => {
    const contentMail = `
        <div style="padding: 10px; background-color: #003375">
            <div style="padding: 10px; background-color: white;">
                <h4 style="color: #0085ff">New User Apply To Campaign: #${full_name}</h4>
                 <span style="color: black">Email: ${email}</span>
            </div>
        </div>
     `
    const data = {
        from: 'user',
        to: 'cuongnguyen.devplus@gmail.com',
        subject: 'USER APPLY TO CAMPAIGN',
        html: contentMail,
    }
    const url = await uploadService.uploadFile(file)
    await sendMail(data)
    const profile = new Profile({
        ...profileBody,
        link_cv: url[0],
    })
    await profile.save()
    return profile
}

const profileDetails = async (profileId) => {
    return Profile.findOne({ _id: profileId })
}

const listProfileByCampaign = async (campaignId, full_name = '', email = '', phone_number = '', status = '') => {
    return Profile.find({
        campaignId: campaignId,
        full_name: { $in: full_name.split(',').map((name) => new RegExp(name, 'i')) },
        email: { $in: email.split(',').map((emails) => new RegExp(emails, 'i')) },
        phone_number: { $in: phone_number.split(',').map((phone) => new RegExp(phone, 'i')) },
        status: { $in: status.split(',').map((sta) => new RegExp(sta, 'i')) },
    })
}

const changeStatusProfile = async (id, profileBody, status) => {
    const profile = await Profile.findOne({ _id: id })
    const userEmail = profile.email
    Object.keys(profileBody).forEach((key) => {
        profile[key] = profileBody[key]
    })
    const contentMail = `
        <div style="padding: 10px; background-color: #003375">
            <div style="padding: 10px; background-color: white;">
                <h4 style="color: #0085ff">Hello: ${profile.full_name} </h4>
                 <span style="color: black">We reviewed your CV and here are the results: ${profile.status} </span>
            </div>
        </div>
     `
    const data = {
        from: 'HR',
        to: userEmail,
        subject: 'REPLY TO THE YOUR CV',
        html: contentMail,
    }
    await profile.save()
    await sendMail(data)
    return profile
}

module.exports = {
    userCreateNewProfile,
    profileDetails,
    listProfileByCampaign,
    changeStatusProfile,
}
