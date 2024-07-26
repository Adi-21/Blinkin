use anchor_lang::prelude::Clock;
use anchor_lang::prelude::*;
use anchor_lang::solana_program::sysvar::SysvarId;

declare_id!("3c1reRtMqJBZjzqmCQqk7Rq3JJ743nCvaTuo1jyUDXR9");

#[program]
pub mod call_program {
    use super::*;

    pub fn initiate_call(
        ctx: Context<InitiateCall>,
        recipient: Pubkey,
        recipient_tiplink: String,
    ) -> Result<()> {
        ctx.accounts
            .initiate(recipient, recipient_tiplink.clone())?;
        emit!(CallInitiatedEvent {
            initiator: ctx.accounts.initiator.key(),
            recipient,
            recipient_tiplink,
        });
        Ok(())
    }

    pub fn respond_call(ctx: Context<RespondCall>) -> Result<()> {
        ctx.accounts.respond()?;
        emit!(CallRespondedEvent {
            initiator: ctx.accounts.call_data.initiator,
            recipient: ctx.accounts.recipient.key(),
        });
        Ok(())
    }
}

#[derive(Accounts)]
pub struct InitiateCall<'info> {
    #[account(
    init,
    payer = initiator,
    space = 8 + 32 + 32 + 64 + 1 // discriminator, initiator pubkey, recipient pubkey, tiplink, response status
  )]
    pub call_data: Account<'info, CallData>,
    #[account(address = Clock::id())]
    pub clock: AccountInfo<'info>,
    #[account(mut)]
    pub initiator: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct RespondCall<'info> {
    #[account(
    mut,
    has_one = recipient
  )]
    pub call_data: Account<'info, CallData>,
    pub recipient: Signer<'info>,
}

#[account]
pub struct CallData {
    pub initiator: Pubkey,
    pub recipient: Pubkey,
    pub recipient_tiplink: String,
    pub response_status: bool,
}

impl<'info> InitiateCall<'info> {
    pub fn initiate(&mut self, recipient: Pubkey, recipient_tiplink: String) -> Result<()> {
        self.call_data.initiator = self.initiator.key();
        self.call_data.recipient = recipient;
        self.call_data.recipient_tiplink = recipient_tiplink;
        self.call_data.response_status = false; // default to not responded
        Ok(())
    }
}

impl<'info> RespondCall<'info> {
    pub fn respond(&mut self) -> Result<()> {
        self.call_data.response_status = true; // mark as responded
        Ok(())
    }
}

#[event]
pub struct CallInitiatedEvent {
    pub initiator: Pubkey,
    pub recipient: Pubkey,
    pub recipient_tiplink: String,
}

#[event]
pub struct CallRespondedEvent {
    pub initiator: Pubkey,
    pub recipient: Pubkey,
}
